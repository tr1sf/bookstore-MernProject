import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const BookCards = ({headline, books}) => {
  return (
    <div className='my-16 px-4 lg:px-24'>
        <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
        {/*card*/}
        <div className='mt-12'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        </Swiper>
        </div>
    </div>

    // <div className='my-16 px-4 lg:px-24'>
    //     <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
    //     {/*card*/}
    //     <Swiper
    //     slidesPerView={1}
    //     spaceBetween={10}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     breakpoints={{
    //       640: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //       },
    //       768: {
    //         slidesPerView: 4,
    //         spaceBetween: 40,
    //       },
    //       1024: {
    //         slidesPerView: 5,
    //         spaceBetween: 50,
    //       },
    //     }}
    //     modules={[Pagination]}
    //     className="mySwiper w-full h-full"
    //     >
    //     {
    //         books.map(book => <SwiperSlide key={book._id}>
    //             <Link to={`/book/$book._id}`}>
    //                 <div className='relative'>
    //                     <img src={book.imageURL} alt="" />
    //                     <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
    //                         <FaCartShopping className='w-4 h-4 text-white'/>
    //                     </div>
    //                 </div>
    //                 <div>
    //                     <h3>{books.bookTitle}</h3>
    //                     <p>{books.authorName}</p>
    //                 </div>
    //                 <div>
    //                     <p>$10.00</p>
    //                 </div>
    //             </Link>
    //             </SwiperSlide>)
    //     }
    //     </Swiper>
    // </div>

  )
}

export default BookCards