import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AccountSettings from "../pages/account-settings";
import Auth from "../pages/auth";
import TrainingUsers from "../pages/training-users";
import TrainingsHistory from "../pages/trainings-history";
import App from "../App";
import accountSettingsStore from "../store/accountSettings.store";
import Error from "../pages/error";
import trainingUsersStore from "../store/trainingUsers.store";
import usersService from "../services/users.service";
import trainingsStore from "../store/trainings.store";
import authService from "../services/auth.service";


const AppRouter = () => {
    const stableStore = useMemo(() => ({
        accountSettings: accountSettingsStore,
        trainingUsers: trainingUsersStore,
        trainings: trainingsStore,
    }), []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="/training-users" />} />
                    <Route
                        path="/training-users"
                        element={<TrainingUsers store={stableStore.trainingUsers} service={usersService} />}
                    />
                    <Route path="/trainings-history" element={<TrainingsHistory store={stableStore.trainings} />} />
                    <Route
                        path="/account-settings"
                        element={
                            <ProtectedRoute>
                                <AccountSettings store={stableStore.accountSettings} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Auth service={authService} />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};


export default AppRouter;