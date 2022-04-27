import {CurrentUserProvider} from "../CustomerApp/contexts/CurrentUserContext";
import classes from "../RestaurantApp/styles.module.scss";
import Header from "../RestaurantApp/components/Header";
import Footer from "../RestaurantApp/components/Footer";
import Body from "./components/Body";

export default function RestaurantApp() {
  return (
    <CurrentUserProvider>
      <div className={classes.wrapper}>
        <Header/>
        <div className={classes.body}>
          <Body/>
        </div>
        <Footer/>
      </div>
    </CurrentUserProvider>
  );
}
