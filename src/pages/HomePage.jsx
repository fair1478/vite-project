import { GalleryCardPagination } from "../components/GalleryCardPagination";

function HomePage() {
  const sampleCards = [
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      ],
      title: "ที่ดินติดแม่น้ำนครนายก 45 เมตร รวม 2 โฉนด",
      bodyText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    {
      images: [
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      ],
      title: "Another Property Listing",
      bodyText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    // Add more cards as needed
    {
      images: [
        "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      ],
      title: "Third Property Listing",
      bodyText:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "5,000,000",
      pricePerUnit: "500,000",
      pricePerRiai: "1,000,000",
    },
  ];

  return (
    <div className="min-h-screen mx-[120px]">
      <div className="flex">
        <h1 className="text-4xl font-bold text-gray-900">Gallery</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <GalleryCardPagination cards={sampleCards} cardsPerPage={3} />
        <GalleryCardPagination cards={sampleCards} cardsPerPage={3} />
      </div>
    </div>
  );
}

export default HomePage;
