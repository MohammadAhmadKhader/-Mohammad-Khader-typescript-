import express from "express";
import { readFileSync } from 'fs';
import asyncHandler from "express-async-handler";

export const router = express.Router();

router.get("/",(req,res) : void =>{
    res.send("Welcome to the library of Journey books, Please use the Query to find your favorite book!")
})


router.get(`/search`,asyncHandler((req,res) : void=>{
    //@ts-ignore
    const bookName : string = req.query.name;
    const booksLibrary : object = returnBooksLibrary();
    
    //@ts-ignore
    const booksArray : object[] = booksLibrary.books;
    const foundedBooks = booksArray.filter((book : object) : object[] => {

        //@ts-ignore
        return book.name.startsWith(bookName)? book : null;
    });
    console.log(foundedBooks);
    if(foundedBooks.length > 0){
        res.status(200).send("Book was found")
    }else{
        res.status(404).send("Book was not found");
    }
    
}))

function returnBooksLibrary() : object{
    const config : object = JSON.parse(readFileSync("./config.json","utf-8"));
    return config;
}