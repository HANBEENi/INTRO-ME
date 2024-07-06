const tabletQuery = () => `@media all and (max-width: 1140px)`;
const mobileQuery = () => `@media all and (max-width: 600px)`;

export const media = {
    tablet: tabletQuery,
    mobile: mobileQuery,
};