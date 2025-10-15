import useGenre from "./useGenre";

describe("useGenre function", () => {
  it("should return an empty string if selectedGenres is empty", () => {
    const result = useGenre([]);
    expect(result).toEqual("");
  });

  it("should return comma separated genre IDs if selectedGenres is not empty", () => {
    const selectedGenres = [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 35, name: "Comedy" },
    ];
    const result = useGenre(selectedGenres);
    expect(result).toEqual("28,12,35");
  });
});
