import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from "./Index"
import Login from "./Login"
import Setting from "./Setting"
import UserProfile from "./UserProfile"
import Registration from './Registration';
import CreateEventPage from './CreateEventPage';
import ContactsPage from './ContactsPage';
import ChatPage from './ChatPage';
import EventPressed from './EventPressed';
import UserProfilePressed from './UserProfilePressed';




const Stack = createStackNavigator();

function Layout() {
  
    return (
      
      <Stack.Navigator>
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="CreateEventPage" component={CreateEventPage} />
        <Stack.Screen name="ContactsPage" component={ContactsPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
        <Stack.Screen name="EventPressed" component={EventPressed} />
        <Stack.Screen name="UserProfilePressed" component={UserProfilePressed} />

      </Stack.Navigator>

    );
  }

export default Layout;