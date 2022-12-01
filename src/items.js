export const getItemtemplate = ({
  name,
  capital,
  population,
  flags,
  languages,
}) =>
  `<p class="country-name">
    <span class="icon-flag">
      <img
        src="${flags.svg}"
        alt="${name.official}"
        width="30px"
        height="20px"
      /> </span
    >${name.official}
  </p>
  <p><span class="span-info">Capital:</span> ${capital}</p>
  <p><span class="span-info">Population:</span> ${population.toLocaleString()}</p>
  <p><span class="span-info">Languages:</span> ${Object.values(languages)}</p>
`;

export const getItemtemplateAll = ({ name, flags }) =>
  `
  <li class="country-item">
    <span class="icon-flag">
      <img
        src="${flags.svg}"
        alt="${name.official}"
        width="30px"
        height="15px"
      /> </span
    >${name.official}
  </li>
`;
