import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../../components/Header";

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                header: () => <Header />,
                drawerActiveTintColor: "blue",
                drawerInactiveTintColor: "gray",
            }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    title: "Home",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="devs"
                options={{
                    title: "Desenvolvedores",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="code" color={color} size={size} />
                    ),
                }}
            />
        </Drawer>
    );
}
