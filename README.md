# js-image-picker

This repository contains the frontend implementation of an image search and display application. The application facilitates image search using a keyword input. It utilizes the Pixabay public API, enabling users to query and retrieve images based on their search query.

Features:
- Search Form: Users can input search queries via a text field and initiate an HTTP request to retrieve relevant images.
- HTTP Requests: The backend utilizes the Pixabay API, requiring a unique access key along with search parameters such as image type, orientation, and safe search filters.
- Gallery and Image Cards: The gallery showcases retrieved images rendered as image cards, displaying details such as likes, views, comments, and downloads.
- Pagination: Implements pagination for displaying images in groups of 40 per request.
- Load More Button: Offers the option to load more images upon clicking the 'Load more' button, hiding the button upon reaching the end of the search results.
- SimpleLightbox Integration: Displays a larger version of images using the SimpleLightbox library for an enhanced viewing experience.
- Smooth Page Scrolling: Implements smooth scrolling after fetching and displaying a new group of images.
- Infinite Scroll: Alternatively, the repository provides a guide for infinite image loading while scrolling through the page.

The repository includes HTML and JavaScript code that enables users to interact with the application's frontend and interactively search and view images based on their preferences.
