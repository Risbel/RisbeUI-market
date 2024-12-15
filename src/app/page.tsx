import ProductRow from "./components/home/ProductRow";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
      <div className="mx-auto">
        <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-extrabold">Find, Buy, and Sell with ease!</h1>
        <h1 className="text-primary text-xl md:text-3xl lg:text-6xl text-center font-extrabold">
          Tailwind UI components
        </h1>

        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base text-center">
          A sleek marketplace to buy and sell Tailwind CSS web components. <br /> Join as a seller or buyer and start
          trading today with us.
        </p>
      </div>

      <ProductRow category="newest" />
      <ProductRow category="templates" />
      <ProductRow category="icons" />
      <ProductRow category="uikits" />
    </section>
  );
}
