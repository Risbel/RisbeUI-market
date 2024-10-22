import NewestProducts from "./components/home/NewestProducts";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-2xl md:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best Tailwind</h1>
        <h1 className="text-primary">Template & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, id eligendi nihil natus voluptates ipsum
          laboriosam maxime. Sint fugit officiis excepturi.
        </p>
      </div>

      <NewestProducts />
    </section>
  );
}
