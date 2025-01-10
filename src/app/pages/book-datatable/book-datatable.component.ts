import {AfterViewInit, Component} from '@angular/core';
import DataTable from 'datatables.net-dt';
import $ from 'jquery';
import {BookService} from "../../services/book.service";
import {Book, BooksPagination} from "../../models/book";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {NzTableModule} from "ng-zorro-antd/table";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";

@Component({
  selector: 'app-book-datatable',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    FormsModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzModalModule,
    NzFormModule,
    NzDatePickerModule,
    NzInputNumberComponent
  ],
  templateUrl: './book-datatable.component.html',
  styleUrl: './book-datatable.component.sass'
})
export class BookDatatableComponent implements AfterViewInit {
  books: Book[] = [];
  selectedBook?: Book;
  booksPagination?: BooksPagination;
  tam: number = 10;
  page: number = 1;
  totalQuantity: number = 0;
  sortBy: string = 'id';
  sortDir: string = 'ascend';
  searchValue = '';
  visible = false;
  isEdit = false;
  listOfColumn = [
    {
      title: 'Title',
      dataIndex: 'title',
      compare: (a: Book, b: Book) => a?.title!.localeCompare(b?.title!),
      priority: false
    },
    {
      title: 'Author',
      dataIndex: 'author',
      compare: (a: Book, b: Book) => a?.author!.localeCompare(b?.author!),
      priority: 3
    },
    {
      title: 'Date Of Publication',
      dataIndex: 'dateOfPublication',
      compare: (a: Book, b: Book) => a!.dateOfPublication?.getDate()! - b.dateOfPublication?.getDate()!,
      priority: 2
    },
    {
      title: 'Price',
      dataIndex: 'price',
      compare: (a: Book, b: Book) => a?.price! - b?.price!,
      priority: 1
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      compare: (a: Book, b: Book) => {},
      priority: 1
    }
  ];

  validateForm = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    author: this.fb.control('', [Validators.required]),
    dateOfPublication: this.fb.control(new Date(), [Validators.required]),
    price: this.fb.control(0, [Validators.required])
  });

  constructor(private fb: NonNullableFormBuilder, private bookService: BookService, private notification: NzNotificationService) {
    this.bookPagination(0, 10, 'id', 'asc', this.searchValue.trim());
    // new DataTable('#example', {
    //   columnDefs: [
    //     {
    //       targets: [0],
    //       orderData: [0, 1]
    //     },
    //     {
    //       targets: [1],
    //       orderData: [1, 0]
    //     },
    //     {
    //       targets: [4],
    //       orderData: [4, 0]
    //     }
    //   ]
    // });
  }

  getBook() {
    this.bookService.getAll().subscribe( (books: Book[]) => {
      console.log(books);
      this.books = books;
    });
  }
  deleteRow(book: Book) {
    this.bookService.publicdelete(book).subscribe( (response) => {
      this.bookPagination(this.page, this.tam, this.sortBy, this.sortDir, this.searchValue.trim());
      this.notification.create(
        'success',
        'Book Deleted',
        'Book deleted correctly'
      );

    }, () => {
      this.notification.create(
        'error',
        'Something went wrong',
        'Please retry and check internet.'
      );
    });
  }
  edit(book: Book) {
    this.validateForm.setValue({
      title: book?.title!,
      author: book?.author!,
      price: book?.price!,
      dateOfPublication: new Date(book?.dateOfPublication!)
    });
    this.selectedBook = book;
    this.isVisible = true;
    this.isEdit = true;
  }
  bookPagination(page: number, size: number, sortBy: string, sortDir: string, title: string) {
    this.bookService.getPagination(page, size, sortBy, sortDir, title).subscribe(
      (response: BooksPagination) => {
        this.booksPagination = response;
        this.totalQuantity = this.booksPagination.totalElements!;
      }
    )
  }

  ngAfterViewInit(): void {
    // this.getBook();
    new DataTable('#example', {
      columnDefs: [
        {
          targets: [0],
          orderData: [0, 1]
        },
        {
          targets: [1],
          orderData: [1, 0]
        },
        {
          targets: [4],
          orderData: [4, 0]
        }
      ]
    });

    $('#example').DataTable();
  }
  search(): void {
    this.visible = false;
    this.bookPagination(0, 10, 'id', 'asc', this.searchValue.trim());
    // this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
  reset(): void {
    this.searchValue = '';
    this.bookPagination(0, 10, 'id', 'asc', this.searchValue.trim());
    this.search();
  }
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    if(this.validateForm.valid) {

      const bookRequest = {
        title: this.validateForm.value.title,
        author: this.validateForm.value.author,
        dateOfPublication: new Date(this.validateForm.value.dateOfPublication!).getTime(),
        price: Number(this.validateForm.value.price)
      }
      if(this.isEdit) {
        this.isEdit = false;
        this.bookService.update(bookRequest, this.selectedBook?.id!).subscribe( (response: Book) => {
          this.bookPagination(this.page, this.tam, this.sortBy, this.sortDir, this.searchValue.trim());
          this.notification.create(
            'success',
            'Book Edited Correctly',
            'Book Edited'
          );
          this.validateForm.reset();
        }, () => {
          this.notification.create(
            'error',
            'Something went wrong',
            'Please retry and check internet.'
          );
        })
      } else {
        this.bookService.create(bookRequest).subscribe( (response: Book) => {
          this.bookPagination(this.page, this.tam, this.sortBy, this.sortDir, this.searchValue.trim());
          this.notification.create(
            'success',
            'Book Added Correctly',
            'Book Added'
          );
          this.validateForm.reset();
        }, () => {
          this.notification.create(
            'error',
            'Something went wrong',
            'Please retry and check internet.'
          );
        })
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
