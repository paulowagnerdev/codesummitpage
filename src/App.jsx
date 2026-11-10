import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
    return (
        <>
            <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
            <Header />
            <main id="conteudo">
                <Hero />
                <Manifesto />
                <Services />
                <Process />
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
