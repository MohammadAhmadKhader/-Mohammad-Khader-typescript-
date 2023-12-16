import express from "express";
import { readFileSync } from 'fs';
import asyncHandler from "express-async-handler";

export const router = express.Router();

router.get("/",(req,res) : void =>{
    res.send("Welcome to the library of Journey books, Please use the Query to find your favorite book!")
})

interface Book {
    name:string,
    author:string,
    isbn:number
}

interface BooksLibrary {
    books:Book[]
}

router.get(`/search`,asyncHandler((req,res) : void=>{
   
    const bookName  = req.query.name as string;
    const booksLibrary = returnBooksLibrary(); 
    
    const booksArray = booksLibrary.books;
    const foundedBooks = booksArray.filter((book) => {

        return book.name.startsWith(bookName)? book : null;
    });
    
    res.status(200).send(foundedBooks)
}))

function returnBooksLibrary() : BooksLibrary{
    const config : BooksLibrary = JSON.parse(readFileSync("./config.json","utf-8"));
    return config;

}