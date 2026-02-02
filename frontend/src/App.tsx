import { useState, useEffect } from 'react';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  HeroUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Chip,
  Card, CardBody, CardHeader, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@heroui/react";
import './App.css';
import argusLogo from './ArgusNeckD.png';
import TopologyMap from './TopologyMap';

const KPIS = [
  { title: "vDSC", numCritical: "2", numMajor: "4", numMinor: "0", numWarning: "0", color: "danger" },
  { title: "vMME", numCritical: "0", numMajor: "0", numMinor: "0", numWarning: "23", color: "success" },
  { title: "vHSS", numCritical: "0", numMajor: "0", numMinor: "0", numWarning: "0", color: "success" },
  { title: "vEPG", numCritical: "0", numMajor: "6", numMinor: "0", numWarning: "0", color: "warning" },
  { title: "vSAPC", numCritical: "0", numMajor: "0", numMinor: "0", numWarning: "0", color: "success" },
  { title: "vCUDB", numCritical: "7", numMajor: "0", numMinor: "25", numWarning: "12", color: "success" },
  { title: "vEDA", numCritical: "0", numMajor: "1", numMinor: "0", numWarning: "0", color: "success" },
  { title: "vDNS", numCritical: "0", numMajor: "0", numMinor: "0", numWarning: "0", color: "success" },
  { title: "BSP", numCritical: "4", numMajor: "0", numMinor: "3", numWarning: "0", color: "success" },
];

const ALERTS = [
  { id: 1, component: "MME-01", message: "S1-AP Setup Failure", severity: "Critical", time: "10:42:05" },
  { id: 2, component: "SGW-04", message: "GTP-U Path Failure", severity: "Major", time: "10:40:12" },
  { id: 3, component: "HSS-01", message: "Database Sync Delay", severity: "Minor", time: "10:15:00" },
];

function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center text-default-500 text-primary">LTE Core Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {KPIS.map((kpi, index) => (
          <Card key={index} className="border border-white/5 bg-content2/50 shadow-md text-center">
            <CardHeader className="justify-center items-center">
              <h2 className="text-default-500 text-3xl font-bold text-center">{kpi.title}</h2>
            </CardHeader>
            <Divider />
            <CardBody className="justify-center items-center py-4">
              <div className={`grid grid-cols-4 w-full text-4xl font-bold`}>
                <div className="text-center flex justify-center text-danger">
                  {kpi.numCritical}
                </div>
                <div className="text-center flex justify-center text-warning">
                  {kpi.numMajor}
                </div>
                <div className="text-center flex justify-center">
                  {kpi.numMinor}
                </div>
                <div className="text-center flex justify-center text-primary">
                  {kpi.numWarning}
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className={`text-default-500 text-2xl font-bold text-center bg-${kpi.color}`}>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Dashboard100() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-primary text-center">Core 100 LTE Topology</h3>
        <TopologyMap />
      </div>
    </div>
  );
}

function Dashboard350() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-primary text-center">Core 350 LTE Topology</h3>
        <TopologyMap />
      </div>
    </div>
  );
}

function LogsPage() {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-danger rounded-full"></span>
          Live Alerts
        </h3>
        <Table className="w-full" aria-label="System Alerts" removeWrapper color="danger" selectionMode="single">
          <TableHeader>
            <TableColumn>COMPONENT</TableColumn>
            <TableColumn>SEVERITY</TableColumn>
            <TableColumn>MESSAGE</TableColumn>
            <TableColumn>TIME</TableColumn>
          </TableHeader>
          <TableBody>
            {ALERTS.map((alert) => (
              <TableRow key={alert.id} className="cursor-pointer hover:bg-white/5 transition-colors">
                <TableCell className="font-bold">{alert.component}</TableCell>
                <TableCell><Chip size="sm" color={alert.severity === "Critical" ? "danger" : "warning"} variant="flat">{alert.severity}</Chip></TableCell>
                <TableCell>{alert.message}</TableCell>
                <TableCell className="text-default-400 font-mono">{alert.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function App() {
  const [backendStatus, setBackendStatus] = useState<string>("Connecting...");
  const location = useLocation();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(() => setBackendStatus("Online 🟢"))
      .catch(() => setBackendStatus("Offline 🔴"));
  }, []);

  return (
    <HeroUIProvider>
      <main className="dark text-foreground bg-background min-h-screen w-full">

        <Navbar isBordered maxWidth="full" className="bg-content1/50 border-b border-white/10">
          <NavbarBrand>
            <div className="flex items-center gap-2">
              <img alt="ArgusLogo" src={argusLogo} width={40} />
              <p className="font-bold text-3xl tracking-widest leading-none font-brand">Argus</p>
            </div>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-8" justify="center">
            <NavbarItem isActive={location.pathname === "/"}>
              <Link as={RouterLink} to="/" color={location.pathname === "/" ? "primary" : "foreground"}>
                Home
              </Link>
            </NavbarItem>

            <NavbarItem isActive={location.pathname === "/core100"}>
              <Link as={RouterLink} to="/core100" color={location.pathname === "/core100" ? "primary" : "foreground"}>
                CORE 100
              </Link>
            </NavbarItem>

            <NavbarItem isActive={location.pathname === "/core350"}>
              <Link as={RouterLink} to="/core350" color={location.pathname === "/core350" ? "primary" : "foreground"}>
                CORE 350
              </Link>
            </NavbarItem>

            <NavbarItem isActive={location.pathname === "/logs"}>
              <Link as={RouterLink} to="/logs" color={location.pathname === "/logs" ? "primary" : "foreground"}>
                Logs
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <Chip color="default" variant="flat" size="sm">{backendStatus}</Chip>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="p-6 w-full max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/core100" element={<Dashboard100 />} />
            <Route path="/core350" element={<Dashboard350 />} />
            <Route path="/logs" element={<LogsPage />} />
          </Routes>
        </div>

      </main>
    </HeroUIProvider>
  );
}

export default App;