import styles from "./Pagination.module.scss";
import { useState, useEffect } from "react";

function Pagination({
  totalPages,
  page,
  setPage,
  handleNextPage,
  handlePreviousPage,
}) {
  // const [visiblePages, setVisiblePages] = useState()

  let visiblePages = [];

  if (totalPages < 5) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
    console.log(visiblePages);
  } else {
    // total pages 5 or more
    if (page === 1 || page === 2) {
      for (let i = 1; i <= 5; i++) {
        visiblePages.push(i);
      }
    } else if (totalPages - page <= 2) {
      visiblePages.push(totalPages - 4);
      visiblePages.push(totalPages - 3);
      visiblePages.push(totalPages - 2);
      visiblePages.push(totalPages - 1);
      visiblePages.push(totalPages);
    } else {
      visiblePages.push(page - 2);
      visiblePages.push(page - 1);
      visiblePages.push(page);
      visiblePages.push(page + 1);
      visiblePages.push(page + 2);
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 1}
        onClick={handlePreviousPage}
        className={styles.pageBtn}
      >
        &larr;
      </button>
      {totalPages < 5 ? (
        <div>
          {visiblePages.map((p) => (
            <button
              onClick={() => setPage(visiblePages[p - 1])}
              className={
                page === visiblePages[p - 1]
                  ? `${styles.pageBtn} ${styles.currentPage}`
                  : styles.pageBtn
              }
            >
              {p}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setPage(visiblePages[0])}
            className={
              page === visiblePages[0]
                ? `${styles.pageBtn} ${styles.currentPage}`
                : styles.pageBtn
            }
          >
            {visiblePages[0]}
          </button>
          <button
            onClick={() => setPage(visiblePages[1])}
            className={
              page === visiblePages[1]
                ? `${styles.pageBtn} ${styles.currentPage}`
                : styles.pageBtn
            }
          >
            {visiblePages[1]}
          </button>
          <button
            onClick={() => setPage(visiblePages[2])}
            className={
              page === visiblePages[2]
                ? `${styles.pageBtn} ${styles.currentPage}`
                : styles.pageBtn
            }
          >
            {visiblePages[2]}
          </button>
          <button
            onClick={() => setPage(visiblePages[3])}
            className={
              page === visiblePages[3]
                ? `${styles.pageBtn} ${styles.currentPage}`
                : styles.pageBtn
            }
          >
            {visiblePages[3]}
          </button>
          <button
            onClick={() => setPage(visiblePages[4])}
            className={
              page === visiblePages[4]
                ? `${styles.pageBtn} ${styles.currentPage}`
                : styles.pageBtn
            }
          >
            {visiblePages[4]}
          </button>
        </div>
      )}
      <button
        disabled={page === totalPages}
        onClick={handleNextPage}
        className={styles.pageBtn}
      >
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;
