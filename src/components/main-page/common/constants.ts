export const PRODUCT_OFFSET = 0;
export const PRODUCT_LIMIT = 12;
export const FILTER_MAP: {
  nation: { [key: string]: string };
  tier: { [key: string]: string };
  type: { [key: string]: string };
} = {
  nation: {
    all: `<span class="flag flag__all" data-nation="all"></span>
          <span class="tanks-select__value">All Nations</span>`,
    france: `<span class="flag flag__france" data-nation="france"></span>
          <span class="tanks-select__value">France</span>`,
    germany: `<span class="flag flag__germany" data-nation="germany"></span>
          <span class="tanks-select__value">Germany</span>`,
    italy: `<span class="flag flag__italy" data-nation="italy"></span>
          <span class="tanks-select__value">Italy</span>`,
    japan: `<span class="flag flag__japan" data-nation="japan"></span>
          <span class="tanks-select__value">Japan</span>`,
    czech: `<span class="flag flag__czech" data-nation="czech"></span>
                <span class="tanks-select__value">Czechoslovakia</span>`,
    uk: `<span class="flag flag__uk" data-nation="uk"></span>
                <span class="tanks-select__value">U.K.</span>`,
    usa: `<span class="flag flag__usa" data-nation="usa"></span>
                <span class="tanks-select__value">U.S.A.</span>`,
    ussr: `<span class="flag flag__ussr" data-nation="ussr"></span>
                <span class="tanks-select__value">U.S.S.R</span>`,
    china: `<span class="flag flag__china" data-nation="china"></span>
                <span class="tanks-select__value">China</span>`,
    merc: `<span class="flag flag__merc" data-nation="merc"></span>
                <span class="tanks-select__value">Mercenary</span>`,
  },
  tier: {
    all: `I-X<span class="tanks-select__value" data-tier="all">All Tiers</span>`,
    '1': `I<span class="tanks-select__value" data-tier="1">Levels</span>`,
    '2': `II<span class="tanks-select__value" data-tier="2">Levels</span>`,
    '3': `III<span class="tanks-select__value" data-tier="3">Levels</span>`,
    '4': `IV<span class="tanks-select__value" data-tier="4">Levels</span>`,
    '5': `V<span class="tanks-select__value" data-tier="5">Levels</span>`,
    '6': `VI<span class="tanks-select__value" data-tier="6">Levels</span>`,
    '7': `VII<span class="tanks-select__value" data-tier="7">Levels</span>`,
    '8': `VII<span class="tanks-select__value" data-tier="8">Levels</span>`,
    '9': `IX<span class="tanks-select__value" data-tier="9">Levels</span>`,
    '10': `X<span class="tanks-select__value" data-tier="10">Levels</span>`,
  },
  type: {
    all: `<span class="tank-type tank-type__all" data-type="all"></span>
    <span class="tanks-select__value">All Types</span>`,
    lighttank: `<span class="tank-type tank-type__lighttank" data-type="lighttank"></span>
    <span class="tanks-select__value">Light Tanks</span>`,
    mediumtank: `<span class="tank-type tank-type__mediumtank" data-type="mediumtank"></span>
    <span class="tanks-select__value">Medium Tanks</span>`,
    heavytank: `<span class="tank-type tank-type__heavytank" data-type="heavytank"></span>
    <span class="tanks-select__value">Heavy Tanks</span>`,
    'at-spg': `<span class="tank-type tank-type__at-spg" data-type="at-spg"></span>
    <span class="tanks-select__value">Tank DEstroyers</span>`,
    spg: `<span class="tank-type tank-type__spg" data-type="spg"></span>
    <span class="tanks-select__value">SPGs</span>`,
    multirole: `<span class="tank-type tank-type__multirole" data-type="multirole"></span>
    <span class="tanks-select__value">Multirole fighter</span>`,
  },
};
