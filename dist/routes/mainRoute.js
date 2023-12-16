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
    //@ts-ignore
    const bookName = req.query.name;
    const booksLibrary = returnBooksLibrary();
    //@ts-ignore
    const booksArray = booksLibrary.books;
    const foundedBooks = booksArray.filter((book) => {
        //@ts-ignore
        return book.name.startsWith(bookName) ? book : null;
    });
    console.log(foundedBooks);
    if (foundedBooks.length > 0) {
        res.status(200).send("Book was found");
    }
    else {
        res.status(404).send("Book was not found");
    }
}));
function returnBooksLibrary() {
    const config = JSON.parse((0, fs_1.readFileSync)("./config.json", "utf-8"));
    return config;
}
