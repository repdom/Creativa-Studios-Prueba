export class Book {
  id?: number;
  title?: string;
  author?: string;
  dateOfPublication?: Date;
  price?: number;
}

export class BooksPagination {
  content: Book[] = [];
  pageable?: Pageable;
  sort?: Sort;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}

export class Pageable {
  pageNumber?: number;
  pageSize?: number;
  sort?: Sort;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export class Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}
