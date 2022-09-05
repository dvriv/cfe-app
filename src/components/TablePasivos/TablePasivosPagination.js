import React from 'react';
import { Icon, Pagination } from 'semantic-ui-react';

const TablePasivosPagination = props => (
  <Pagination
    defaultActivePage={1}
    ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
    firstItem={{ content: <Icon name="angle double left" />, icon: true }}
    lastItem={{ content: <Icon name="angle double right" />, icon: true }}
    prevItem={{ content: <Icon name="angle left" />, icon: true }}
    nextItem={{ content: <Icon name="angle right" />, icon: true }}
    totalPages={props.totalPages}
    onPageChange={props.handlePageChange}
  />
);

export default TablePasivosPagination;
