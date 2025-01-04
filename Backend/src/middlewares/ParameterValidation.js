
function validateEmail(req, res, next) {
    const { email } = req.params;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    next();
}

function validatePageNumber(req, res, next) {
    const { pageNumber } = req.params;
    if (!Number.isInteger(Number(pageNumber))) {
        return res.status(400).json({ error: "pageNumber must be a integer" });
    }

    next();
}

function validateMaxEntriesPerPage(req, res, next) {
    const { maxEntriesPerPage } = req.params;
    if (!Number.isInteger(Number(maxEntriesPerPage))) {
        return res.status(400).json({ error: "maxEntriesPerPage must be an integer" });
    }

    next();
}

function ValidateSearchResultQuery(req, res, next) {
    const { search } = req.params;
    console.log(search);
    // Check if search parameter is missing or empty
    if (!search || search.trim() === "") {
        return res.status(400).json({ error: "Search query cannot be empty." });
    }

    next();
}

module.exports = { validateEmail, validatePageNumber, validateMaxEntriesPerPage, ValidateSearchResultQuery };