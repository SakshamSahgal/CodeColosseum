
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

module.exports = { validateEmail, validatePageNumber, validateMaxEntriesPerPage };