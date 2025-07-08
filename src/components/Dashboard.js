import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE_OPTIONS = [10, 50, 100];

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [sortConfig, setSortConfig] = useState(
    JSON.parse(localStorage.getItem("sort")) || { key: null, direction: null }
  );
  const [pageSize, setPageSize] = useState(
    parseInt(localStorage.getItem("pageSize") || 10)
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("page") || 1)
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("sort", JSON.stringify(sortConfig));
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("page", currentPage);
  }, [search, sortConfig, pageSize, currentPage]);

  const filtered = comments.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.body.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const vaIA = a[sortConfig.key].toString().toLowerCase();
    const vaIB = b[sortConfig.key].toString().toLowerCase();
    if (vaIA < vaIB) return sortConfig.direction === "asc" ? -1 : 1;
    if (vaIA > vaIB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      if (prev.direction === "desc") return { key: null, direction: null };
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="container">
      <h2>Comments Dashboard</h2>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by name/email/body"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button onClick={() => navigate("/profile")}>View Profile</button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort("postId")}>Post ID</th>
            <th onClick={() => toggleSort("name")}>Name</th>
            <th onClick={() => toggleSort("email")}>Email</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.postId}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>Page size: </span>
        {PAGE_SIZE_OPTIONS.map((size) => (
          <button
            key={size}
            className={pageSize === size ? "active" : ""}
            onClick={() => {
              setPageSize(size);
              setCurrent(1);
            }}
          >
            {size}
          </button>
        ))}
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
