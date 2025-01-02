import { Pagination } from "react-bootstrap";

const renderPagination = (currentPage, totalPages, handlePageChange) => {
    let items = [];
    const maxPagesToShow = 5; // Maximum pages to show before ellipsis

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Ensure that we always have at least 3 pages (with ellipsis if needed)
    if (startPage > 1) {
        items.push(
            <Pagination.First key="first" onClick={() => handlePageChange(1)} />
        );
        items.push(<Pagination.Ellipsis key="startEllipsis" />);
    }

    for (let page = startPage; page <= endPage; page++) {
        items.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    if (endPage < totalPages) {
        items.push(<Pagination.Ellipsis key="endEllipsis" />);
        items.push(
            <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} />
        );
    }

    items.push(
        <Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} />
    );

    return items;
};

export default renderPagination;