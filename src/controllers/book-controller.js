//import modules
import { author } from "../models/index.js";
import { book } from "../models/index.js";
import { Publisher } from "../models/index.js";
import NotFound from "../error/not-found.js";
import wrongRequest from "../error/bad-request.js"
import BadRequest from "../error/bad-request.js";

// ✅ GET /books — returns the list of all books in JSON format
class BookController {
  // ✅ methodo get all books
  static listBooks = async (req, res, next) => {
  try {
    // parse seguro (defaults + limites)
    const limitRaw = Number.parseInt(req.query.limit ?? '5', 10);
    const pageRaw  = Number.parseInt(req.query.page  ?? '1', 10);

    const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(limitRaw, 100) : 5; // limite hard de 100
    const page  = Number.isFinite(pageRaw)  && pageRaw  > 0 ? pageRaw : 1;

    // validação explícita (se quiser falhar com 400 quando parâmetros ruins forem enviados)
    if (!Number.isInteger(limit) || !Number.isInteger(page) || limit <= 0 || page <= 0) {
      return next(new BadRequest('Parâmetros "page" e "limit" devem ser inteiros > 0.'));
    }

    // consulta + paginação
    const [books, total] = await Promise.all([
      book
        .find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('author')
        .populate('publisher')
        .lean(), // resposta mais leve
      book.countDocuments({})
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    // log opcional
    // console.log('📄 Resultado vindo do Mongo:', { count: books.length, page, limit });

    // resposta padronizada com meta de paginação
    return res.status(200).json({
      data: books,
      meta: { page, limit, total, totalPages }
    });

  } catch (error) {
    return next(error);
  }
};


  // ✅ methodo GET specific books
  static listBookById = async (req, res, next) => {
    try {
      //define the methodo that will get the id from the books
      const { id } = req.params;

      //define the methodo that will find the specific book
      //const bookResult = await book.findById(id);

      const doc = await book
        .findById(id)
        .populate("author")
        .populate("publisher");

      if (!doc) {
        return res.status(404).json({ message: "book not founs !" });
      }

      res.status(200).json(doc);
    } catch (error) {
      //call the error middleware
      next(error);
    }
  };

  // methodo POST to create a specific Book
  static postbook = async (req, res, next) => {
    try {
      const {
        title,
        value,
        pages,
        author: authorId,
        publisher: publisherId,
      } = req.body;

      const newBook = {
        title,
        value,
        pages,
        author: authorId,
        publisher: publisherId,
      };

      // Aqui ele já valida se os campos obrigatórios estão presentes
      const bookCreated = await book.create(newBook);

      // Aqui busca os detalhes completos (opcional)
      const findAuthor = await author.findById(authorId);
      const findPublisher = await Publisher.findById(publisherId);

      const completeBook = {
        ...bookCreated._doc,
        author: findAuthor,
        publisher: findPublisher,
      };

      if (!completeBook) {
        return next(new NotFound("Book not Created"));
      }

      res.status(201).json({
        message: "Created with Success",
        book: completeBook,
      });
    } catch (error) {
      // define the error response
      next(error);
    }
  };

  // methodo PUT a specific book
  static PutBookById = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const {
        author: authorId,
        publisher: publisherId,
        ...updateData
      } = req.body;

      //define the const variable thar will validate if the author Exists
      if (authorId !== undefined) {
        const authorDoc = await author.findById(authorId); // CastError se ID inválido
        if (!authorDoc) {
          return next(new NotFound("Author not found"));
        }

        updateData.author = authorId;
      }

      //define the const variable that will validate if the Publisher Exists
      if (publisherId !== undefined) {
        const publisherDoc = await Publisher.findById(publisherId); // CastError se ID inválido
        if (!publisherDoc) {
          return res.status(404).json({ message: "Publisher not found" });
        }
        updateData.publisher = publisherId;
      }

      //only attach author ID (not full Document)
      const updatedBook = await book
        .findByIdAndUpdate(bookId, updateData, {
          new: true,
          runValidators: true,
        })
        .populate("author")
        .populate("publisher");

      if (!updatedBook) {
        return next(new NotFound("Book not found"));
      }

      //define sucess message
      return res.status(200).json({ message: "Book Updated Sucessfully !!" });
    } catch (error) {
      //define the error contoller handling
      next(error);
    }
  };

  // methodo DELETE a specific book
  static DeleteBookById = async (req, res, next) => {
    try {
      // define the variable that will get the ID Book from the data JSON
      const id = req.params.id;

      //define the methodo that will find de book by his id and deleted
      const deletedBook = await book.findByIdAndDelete(id);

      // define the response if the methodo did not sucessfuly deleted the book
      if (!deletedBook) {
        return next(new NotFound("book not found"));
      }

      // console log to print the response from mongo
      console.log("📄 Resultado vindo do Mongo:", deletedBook);

      // define the sucessfully message
      res.status(200).json({ message: "✅ Book deleted successfully!" });
    } catch (error) {
      //define the error response
      next(error);
    }
  };

  // methodo GET by parametre of search
  static listBookByPublisher = async (req, res, next) => {
    //define the variable that will get the publisher from json request
    const publisher = req.query.publisher;

    // define the try catch
    try {
      // define the action to find the book by publisher
      const booksByPublisher = await book.find({ publisher });

      if (!booksByPublisher || booksByPublisher.length === 0) {
        return next(new NotFound("No books found for this Publisher"));
      }

      // define the response when find the book
      res.status(200).json(booksByPublisher);
    } catch (error) {
      //call the middleware error treatment
      next(error);
    }
  };

  static listBookByFilter = async (req, res, next) => {
    try {
      // define the variable that will get the query parameters
      const { publisher, title, minPages, maxPages, authorName } = req.query;

      // define the filter object
      const filter = {};

      // title: parcial search, case-insensitive
      if (minPages || maxPages) {
        filter.pages = {};
        if (minPages) {
          filter.pages.$gte = Number(minPages);
        }
        if (maxPages) {
          filter.pages.$lte = Number(maxPages);
        }
      }

      // title: parcial search, case-insensitive
      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }

      // publisher: acept NAME ou ID
      if (publisher) {
        // 1) try resolve (case-insensitive)
        const pubByName = await Publisher.findOne({
          name: { $regex: `^${publisher}$`, $options: "i" },
        }).select("_id");
        console.log("Publisher found:", pubByName);
        if (pubByName) {
          filter.publisher = pubByName._id;
        } else {
          filter.publisher = publisher;
          console.log("Assuming publisher is an ID:", filter.publisher);
        }
      }

      //authorName: acept NAME//define authorName filter
      if (authorName) {
        const authors = await author
          .find({ name: { $regex: authorName, $options: "i" } })
          .select("_id");

        console.log("Authors found:", authors);

        if (authors.length > 0) {
          const ids = authors.map((a) => a._id);
          // cobre ambos os esquemas: author (único) OU authors (array)
          filter.$or = [{ author: { $in: ids } }, { authors: { $in: ids } }];
        } else {
          // middleware já garante ID válido, então podemos usar direto
          filter.$or = [{ author: authorName }, { authors: authorName }];
        }
      }

      // Debug do filtro final
      console.log(
        "Filter Apply:",
        JSON.stringify(filter, (_, v) =>
          v && v._bsontype === "ObjectID" ? v.toString() : v
        )
      );

      const books = await book
        .find(filter)
        .populate("author")
        .populate("publisher")
        .lean();

      console.log("Filter Apply:", JSON.stringify(filter));

      if (books.length === 0) {
        return next(new NotFound("No books found for the given filters"));
      }

      return res.status(200).json(books);
    } catch (error) {
      // CastError/ValidationError caem no seu middleware
      next(error);
    }
  };
}

export default BookController;
