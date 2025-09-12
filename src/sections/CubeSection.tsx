import RedScrollCube from "../components/RedScrollCube";

export const CubeSection = () => {
  return (
    <section
      id="cube"
      className="section section--primary"
      style={{
        padding: 0,
        minHeight: "59vh",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <RedScrollCube/>
    </section>
  );
};
