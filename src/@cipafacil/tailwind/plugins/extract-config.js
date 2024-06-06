const plugin = require('tailwindcss/plugin');
const buildMediaQuery = require('tailwindcss/lib/util/buildMediaQuery').default;

const extractConfig = plugin(({
    addVariant,
    theme
}) =>
{
    addVariant('cipafacil-tailwind-extracted-config', ({container}) =>
    {
        // Prepare the extracted config variable
        let extractedConfig = '';

        // Breakpoints
        Object.entries(theme('screens')).forEach(([key, value]) =>
        {
            extractedConfig = `${extractedConfig} --breakpoints-${key}:'${buildMediaQuery(value)}';`;
        });

        // Themes
        (theme('cipafacil.themes')).forEach((value) =>
        {
            extractedConfig = `${extractedConfig} --themes-${value}:'${value}';`;
        });

        // Append the extracted config
        container.append(`
            .cipafacil-tailwind-extracted-config {
                ${extractedConfig}
            }
        `);
    });
});

module.exports = extractConfig;
