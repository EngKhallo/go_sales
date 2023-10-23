import { useEffect, useState } from "react";
import { Grid, GridItem, Show, useColorMode } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes, useLocation, useSearchParams } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import { Header } from "./components/Header";
import { Charts } from "./pages/Charts";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import Rooms from "./pages/Rooms";
import { Bookings } from "./pages/Bookings";
import Reports from "./pages/Reports";
import { HotelsReport } from "./pages/Reports/Hotels";
import { BookingReport } from "./pages/Reports/Bokings";
import Login from "./pages/Auth/Login";
import { Sidebar } from "./components/sidebar";
import { allowedRoutes } from "./route";
import { MostBookedHotel } from "./pages/Reports/MostBookedHotel";
import { Inventories } from "./pages/Inventories";

function App() {
  const [navSize, setNavSize] = useState("large");
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    // Read the user role from local storage
    const role = localStorage.getItem("role");
    const defaultRole = role || ""; // Use an empty string as the default value if role is null

    setUserRole(defaultRole);
  }, []);

  const filteredRoutes = allowedRoutes[userRole] || [];


  const location = useLocation()

  console.log('ssss', location.pathname)

  localStorage
  return (

    <Grid
      templateAreas={{
        lg: `"nav header" "nav main" "nav footer"`,
        base: `"header" "main" "footer"`
      }}
      gridTemplateRows={'60px 1fr 30px'}
      templateColumns={{
        base: '1fr',
        lg: `${navSize == "small" ? "75px" : '200px'} 1fr`
      }}
      fontWeight='bold'
      minHeight={"100vh"}
    >
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <Show above="lg">
        <GridItem
          display={location.pathname == '/login' ? 'none' : 'grid'}
          position="fixed" // Make the sidebar fixed
          //  top="60px" // Adjust the top value to match your header height
          left="0"
          width={navSize == "small" ? "75px" : "200px"}
          height="100vh" // Subtract the header height from the viewport height
          boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
          area={'nav'}
          zIndex={1} // Set a higher z-index to keep it above the main section
          overflowY="auto" // Allow the sidebar to scroll if the content exceeds its height
        >
          <Sidebar setNavSize={setNavSize} navSize={navSize} />
        </GridItem>
      </Show>
      <GridItem overflowX="auto" maxW="100%" whiteSpace="nowrap" bg={isDarkMode ? 'gray.800' : 'gray.200'} area={'main'}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inventories' element={<Inventories />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/charts' element={<Charts />} />
          <Route path='/users' element={<Users />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/hotelReports' element={<HotelsReport />} />
          <Route path='/bookingReports' element={<BookingReport />} />
          <Route path='/financialReports' element={<Reports />} />
          <Route path='/mostBookedHotel' element={<MostBookedHotel />} />

          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </GridItem>
      <GridItem pl='2' area={'footer'}>
        <Footer />
      </GridItem>
    </Grid>

  );
}

export default App;
