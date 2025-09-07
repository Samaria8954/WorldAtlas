import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../API/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";
import ReactPaginate from "react-paginate";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("all");

  // pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // default desktop
  const [pageRange, setPageRange] = useState(3);
  const [marginPages, setMarginPages] = useState(2);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth <= 767) {
        setItemsPerPage(1);   // mobile: 1 card per page
        setPageRange(2);      // sirf 1, 2
        setMarginPages(0);    // no first/last, only 1 & 2
      } else if (window.innerWidth <= 992) {
        setItemsPerPage(4);   // tablet: 4 cards
        setPageRange(3);
        setMarginPages(2);
      } else {
        setItemsPerPage(6);   // desktop: 6 cards
        setPageRange(3);
        setMarginPages(2);
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // fetch API data
  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

  const searchCountry = (country) => {
    if (search) {
      return country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
    }
    return country;
  };

  const filterRegion = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  };

  // filtering
  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  // pagination slice
  const offset = currentPage * itemsPerPage;
  const currentItems = filterCountries.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filterCountries.length / itemsPerPage);

  // page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      {/* Grid */}
      <ul className="grid-three-cols gap-6">
        {currentItems.map((curCountry, index) => (
          <CountryCard country={curCountry} key={index} />
        ))}
      </ul>

      {/* Pagination */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          breakLabel={""}   // no "..."
          pageCount={pageCount}
          marginPagesDisplayed={marginPages}
          pageRangeDisplayed={pageRange}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </section>
  );
};
