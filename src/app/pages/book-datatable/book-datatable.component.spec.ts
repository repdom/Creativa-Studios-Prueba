import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDatatableComponent } from './book-datatable.component';

describe('BookDatatableComponent', () => {
  let component: BookDatatableComponent;
  let fixture: ComponentFixture<BookDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
