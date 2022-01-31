// Source: svench/src/knobs.js, but removed $previous store resumability to reduce complexity

import { writable } from 'svelte/store';

const parseValueType = (value) => {
  let type = typeof value;
  if (typeof value === 'string') {
    const match = /^(-?[\d.]+)-(-?[\d.]+)(?:;([\d.]+))?$/.exec(value);
    if (match) {
      const [, min, max, x] = match;
      value = x != null ? x : (parseInt(max) - parseInt(min)) / 2;
      // @ts-ignore
      return { default: value, type, min, max };
    }
  } else if (type === 'object') {
    return value;
  }
  return { default: value, type };
};

const parseConfig = (cfg) => {
  if (typeof cfg === 'object' && !Array.isArray(cfg)) {
    return Object.entries(cfg).map(([name, value]) => {
      return {
        name,
        ...parseValueType(value),
      };
    });
  } else {
    return cfg;
  }
};

export default (cfg) => {
  if (!cfg) return null;

  cfg = parseConfig(cfg);

  const knobs = writable(
    Object.fromEntries(
      cfg.map(({ name, default: defaultValue = undefined }) => [name, defaultValue])
    )
  );

  // knobs.set

  // @ts-ignore
  knobs.fields = cfg.map(({ name, type = 'text', ...props }) => ({
    name,
    type,
    ...props,
  }));
  console.log(knobs);

  return knobs;
};
