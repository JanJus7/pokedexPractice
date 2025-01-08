"use client";

import { useEffect, useState } from "react";

export default function ComparePage() {
  const [compared, setCompared] = useState([]);

  useEffect(() => {
    const storedCompares = JSON.parse(localStorage.getItem("compared")) || [];
    setCompared(storedCompares);
  }, []);

  const handleClearComparison = () => updateCompared([]);

  const updateCompared = (updated) => {
    setCompared(updated);
    localStorage.setItem("compared", JSON.stringify(updated));
  };

  const getComparisonClass = (val1, val2) =>
    val1 > val2 ? "green-text" : val1 < val2 ? "red-text" : "";

  const renderStatsRow = (statName, value1, value2) => (
    <tr key={statName}>
      <td>{statName}</td>
      <td className={getComparisonClass(value1, value2)}>{value1}</td>
      <td className={getComparisonClass(value2, value1)}>{value2}</td>
    </tr>
  );

  if (!compared.length) {
    return (
      <div className="body">
        <div className="main">
          <p className="textFav">Compared Pokemon list is empty...</p>
        </div>
      </div>
    );
  }

  const [poke1, poke2] = compared;
  return (
    <div className="body">
      <div className="main pokemon-comparison">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{poke1?.name}</th>
              <th>{poke2?.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {[poke1, poke2].map((p, i) => (
                <td key={i} className="pokemon-image">
                  <img src={p?.sprites.front_default} alt={p?.name} />
                </td>
              ))}
            </tr>
            <tr>
              <td>Types</td>
              {[poke1, poke2].map((p, i) => (
                <td key={i}>
                  <ul className="pokemon-types">
                    {p?.types.map(({ type }) => (
                      <li key={type.name}>{type.name}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            {["Weight", "Height"].map((attribute) =>
              renderStatsRow(
                attribute,
                poke1[attribute.toLowerCase()],
                poke2[attribute.toLowerCase()]
              )
            )}
            {poke1.stats.map(({ stat, base_stat }, i) =>
              renderStatsRow(stat.name, base_stat, poke2.stats[i]?.base_stat)
            )}
          </tbody>
        </table>
        <button className="clear-button" onClick={handleClearComparison}>
          <i className="fa-regular fa-trash-can"></i> Clear all...
        </button>
      </div>
    </div>
  );
}
