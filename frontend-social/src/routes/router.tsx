import { createBrowserRouter } from "react-router-dom";
import { LoginPage, MyPublicationsPage, PerfilPage, PublicationPage, RegisterPage } from "../pages";
import { AuthProvider } from "../context/auth";
import { MainLayout } from "../containers/MainLayout";
import { OtherPerilPage } from "../pages/OtherPerilPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
  {
    path: "/register",
    element: (

        <RegisterPage />
 
    ),
  },
  {
    path: "/perfil",
    element: (
      <AuthProvider>
        <MainLayout>
          <PerfilPage />

        </MainLayout>
      </AuthProvider>
    ),
  },
  {
    path: "/publication",
    element: (
      <AuthProvider>
        <MainLayout>
          <PublicationPage />

        </MainLayout>
      </AuthProvider>
    ),
  },
  {
    path: "/publication-me",
    element: (
      <AuthProvider>
        <MainLayout>
          <MyPublicationsPage />

        </MainLayout>
      </AuthProvider>
    ),
  },
  {
    path: "/perfil/:id",
    element: (
      <AuthProvider>
        <MainLayout>
          <OtherPerilPage />

        </MainLayout>
      </AuthProvider>
    ),
  },
  
]);

export default router;
