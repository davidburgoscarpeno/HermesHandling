import SideBarAdmin from "../components/SideBarAdmin";

function AdminApp() {
    return (
        <div className="d-flex">
            <SideBarAdmin />
            <div className="content-wrapper flex-grow-1">
                {/* Aquí iría el contenido principal del admin */}
            </div>
        </div>
  );
}

export default AdminApp;