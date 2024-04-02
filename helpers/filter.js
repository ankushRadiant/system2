const getFilter = (req, searchOptions) => {
    const { query: { status = 'all', search = '', sortBy = 'createdAt', sortOrder = 'desc' } } = req;
    const query = status === 'all' ? {} : { status };
    if (search) {
        query['$or'] = searchOptions.map(item => ({ [item]: { $regex: search, $options: 'i' } }));
    }
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    return { sort, query };
};

module.exports = { getFilter };
