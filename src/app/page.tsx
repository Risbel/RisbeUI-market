import ProductRow from "./components/home/ProductRow";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
      <div className="mx-auto">
        <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-extrabold">
          <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#000000,45%,#4e92ff,55%,#000000)] bg-[length:250%_100%] bg-clip-text text-transparent">
            Find, Buy, and Sell with ease!
          </span>
        </h1>
        <h1 className="text-primary text-xl md:text-3xl lg:text-6xl text-center font-extrabold">
          <span className="inline-flex animate-text-gradient bg-gradient-to-r from-primary via-[#934bff] to-primary bg-[200%_auto] bg-clip-text text-transparent">
            Tailwind UI components
          </span>
        </h1>

        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base text-center">
          A sleek marketplace to buy and sell Tailwind CSS web components. <br /> Join as a seller or buyer and start
          trading today with us.
        </p>
      </div>

      <ProductRow category="newest" />
      <ProductRow category="components" />
      <ProductRow category="templates" />
      <ProductRow category="uikits" />
    </section>
  );
}
