"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    res.send("Welcome to the library of Journey books, Please use the Query to find your favorite book!");
});
exports.router.get(`/search`, (0, express_async_handler_1.default)((req, res) => {
    const bookName = req.query.name;
    const booksLibrary = returnBooksLibrary();
    const booksArray = booksLibrary.books;
    const foundedBooks = booksArray.filter((book) => {
        return book.name.startsWith(bookName) ? book : null;
    });
    res.status(200).send(foundedBooks);
}));
function returnBooksLibrary() {
    const config = JSON.parse((0, fs_1.readFileSync)("./config.json", "utf-8"));
    return config;
}
