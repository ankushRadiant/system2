const Pagination = (req, res) => {
    const { query: { page = 1, limit = 10, sortOrder } } = req;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    const skip = (parsedPage - 1) * parsedLimit;

    const sortOrderObj = sortOrder ? { createdAt: 1 } : { createdAt: -1 };

    return { page: parsedPage, limit: parsedLimit, skip, sortOrder: sortOrderObj };
};

module.exports = { Pagination };
