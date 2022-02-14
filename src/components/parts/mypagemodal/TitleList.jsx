const TitleList = {
  application: ['created_at', 'title', 'writer', 'state'],
  loan: [
    'loaned_date',
    'returned_date',
    'return_due_date',
    'title',
    'writer',
    'return_state',
  ],
  wish: [
    'book_name',
    'book_name.writer',
    'book_name.state',
    'book_name.return_due_date',
  ],
};

export default TitleList;
