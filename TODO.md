# TODO: Add Navigation Buttons to Sidebar

## Tasks
- [x] Modify Sidebar.jsx to include navigation buttons (Home, Profile, Favourites, Maps) at the top, above filters
- [x] Add props to Sidebar.jsx for handling button clicks (onHome, onProfile, onFavourites, onMaps)
- [x] Update Dashboard.jsx to add currentView state ('home', 'favourites', 'maps', 'profile')
- [x] Implement conditional rendering in Dashboard.jsx based on currentView
  - [x] 'home': Show default car grid and stats
  - [x] 'favourites': Show only favourite cars
  - [x] 'maps': Show placeholder map view
  - [x] 'profile': Show placeholder profile view
- [x] Pass navigation handlers from Dashboard.jsx to Sidebar.jsx
- [ ] Test navigation buttons to ensure views switch correctly
