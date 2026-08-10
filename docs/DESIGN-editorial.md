# Editorial design brief (Wired-inspired, brand remapped)

Source inspiration: [WIRED DESIGN.md on getdesign.md](https://getdesign.md/wired/design-md).  
This file is **not** a theme takeover. Home keeps molten teal + Ubuntu. Work and Blog use editorial *structure* only.

## Brand remapping

| Wired token | Our token |
| --- | --- |
| Canvas `#ffffff` | `background` / page surface |
| Ink `#000000` | `foreground` |
| Body gray `#757575` | `muted-foreground` |
| Hairline `#e0e0e0` | `border` |
| Link `#057dbc` | `--accent-brand` (`#0f6e56` / `#3dba8f`) |
| WiredDisplay | EB Garamond (`font-display` / `--font-garamond`) |
| Apercu / meta | Ubuntu (`font-sans`) |
| Radius 0 (sitewide) | Shared chrome stays `rounded-md`; editorial cards may use hairline + `rounded-none` |

## Layout patterns (Work + Blog)

1. **Masthead band** - thin hairline + uppercase kicker + page title.
2. **Featured story** - one large headline (EB Garamond), summary, byline/meta in Ubuntu.
3. **Secondary grid** - two-up story cards on `md+`.
4. **Story rows** - vertical list separated by 1px hairlines.
5. **Article shell** - kicker, display title, meta row, measure ~65ch, teal inline links.

## Rules

- No purple gradients, no Wired ink-blue, no second brand system on home.
- No em dashes in copy. Plain hiring-manager voice.
- Prefer hairlines over heavy cards for editorial indexes.
- Honor `prefers-reduced-motion`.
