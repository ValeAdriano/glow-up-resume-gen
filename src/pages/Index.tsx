
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FileText, ArrowRight, Award, Zap, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Crie currículos profissionais
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Destaque seu potencial com currículos otimizados
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Crie currículos impressionantes que capturam a atenção dos recrutadores e aumentam suas chances de conquistar a entrevista.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth/sign-up">
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth/sign-in">Já tenho conta</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="resume-paper overflow-hidden shadow-2xl rounded-md rotate-1">
                  <img
                    src="/placeholder.svg"
                    alt="Exemplo de currículo"
                    className="w-full h-full object-cover"
                    width={500}
                    height={707}
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 resume-paper overflow-hidden shadow-2xl rounded-md -rotate-2 border border-border">
                  <img
                    src="/placeholder.svg"
                    alt="Exemplo de currículo"
                    className="w-full h-full object-cover"
                    width={500}
                    height={707}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Recursos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tudo o que você precisa para criar currículos excepcionais
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nossa plataforma foi desenvolvida para simplificar o processo de criação de currículos e destacar suas habilidades de forma profissional.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Templates Profissionais</h3>
                <p className="text-muted-foreground">
                  Escolha entre diferentes templates modernos, clássicos e minimalistas para se adequar ao seu estilo e à vaga desejada.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Preview em Tempo Real</h3>
                <p className="text-muted-foreground">
                  Visualize as mudanças em seu currículo instantaneamente enquanto você edita, facilitando os ajustes.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Exportação em PDF</h3>
                <p className="text-muted-foreground">
                  Exporte seu currículo pronto em PDF de alta qualidade, pronto para ser enviado aos recrutadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pronto para impulsionar sua carreira?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Crie seu currículo otimizado agora e destaque-se no mercado de trabalho.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/auth/sign-up">Criar meu currículo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
