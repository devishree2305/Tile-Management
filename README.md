# Tile Management System

A full-stack Tile Management application with:

- 🔷 **Frontend**: React.js (`tiles-manage1`)
- 🔷 **Backend**: ASP.NET Core (`TileManagement`)

---

## Project Structure

Tile-Management/  
├── tiles-manage1/ # ReactJS frontend  
├── TileManagement/ # ASP.NET Core backend  
└── README.md # Instructions to run the project  

Clone the Repository

git clone https://github.com/your-username/Tile-Management.git  
cd Tile-Management

## Frontend Setup (tiles-manage1)
Configure API Port , inside /src/api - Ensure matches the port used by the backend.  
npm run dev   # for vite

## Backend Setup (TileManagement)
1. Open TileManagement.sln in Visual Studio.  
2. In appsettings.json, update the database connection string and jwt  
3. Make sure all necessary NuGet packages are restored:  
- dotnet restore  
4. In Visual Studio, go to Build > Build Solution   
5. To create and apply the initial database schema:  
Go to: Tools > NuGet Package Manager > Package Manager Console  
Run the following commands one by one:   
- Add-Migration initDB  
- Update-Database  
7. After successful migration, start the backend
