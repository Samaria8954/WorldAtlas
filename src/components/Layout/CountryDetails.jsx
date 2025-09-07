import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Loader } from "../UI/Loader";
import { getCountryIndvData } from "../../API/postApi";

export const CountryDetails = () => {

    const params = useParams();
    console.log(params);
    const [isPending, startTransition] = useTransition();
    const [Country, setCountry] = useState();

    

    useEffect(() => {
        startTransition(async () => {
            const res = await getCountryIndvData(params.id);
            console.log(res);
            if (res.status === 200) {
                setCountry(res.data[0]);
            }
              console.log(Object.keys(res.data[0].name.nativeName));
        });
    }, [params.id]);

    if (isPending) return <Loader />;
    return (
       <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        {Country && (
          <div className="country-image grid grid-two-cols">
            <img
              src={Country.flags.svg}
              alt={Country.flags.alt}
              className="flag"
            />
            <div className="country-content">
              <p className="card-title"> {Country.name.official} </p>

              <div className="infoContainer">
                <p>
                  <span className="card-description"> Native Names:</span>
                  {Object.keys(Country.name.nativeName)
                    .map((key) => Country.name.nativeName[key].common)
                    .join(", ")}
                </p>
                <p>
                  <span className="card-description"> Population: </span>
                  {Country.population.toLocaleString()}
                </p>
                <p>
                  <span className="card-description"> Region:</span>
                  {Country.region}
                </p>
                <p>
                  <span className="card-description"> Sub Region:</span>
                  {Country.subregion}
                </p>
                <p>
                  <span className="card-description"> Capital:</span>
                  {Country.capital}
                </p>

                <p>
                  <span className="card-description">Top Level Domain:</span>
                  {Country.tld[0]}
                </p>
                <p>
                  <span className="card-description"> Currencies: </span>
                  {Object.keys(Country.currencies)
                    .map((curElem) => Country.currencies[curElem].name)
                    .join(", ")}
                </p>
                <p>
                  <span className="card-description">Languages: </span>
                  {Object.keys(Country.languages)
                    .map((key) => Country.languages[key])
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="country-card-backBtn">
          <NavLink to="/country" className="backBtn">
            <button>Go Back</button>
          </NavLink>
        </div>
      </div>
    </section>
    );
};