import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/emailUnico.validator";
import { ValidRole } from "../validacao/tipoRole.validator";

export class AtualizaUsuarioDTO {
  @ApiPropertyOptional({ description: "O papel do usuário", example: "professor" })
  @ValidRole({ message: "Tipo inválido, somente: professor ou aluno" })
  @IsNotEmpty({ message: "Campo 'role' não pode ser vazio" })
  @IsOptional()
  role: string;

  @ApiPropertyOptional({ description: "O nome completo do usuário", example: "Nome Completo" })
  @IsNotEmpty({ message: "Campo 'nome_completo' não pode ser vazio" })
  @IsOptional()
  nome_completo: string;

  @ApiPropertyOptional({ description: "O e-mail do usuário", example: "usuario@exemplo.com" })
  @IsEmail(undefined, { message: "O 'email' informado é inválido" })
  @IsNotEmpty({ message: "Campo 'email' não pode ser vazio" })
  @IsOptional()
  @EmailEhUnico({ message: 'E-mail já registrado' })
  email: string;

  @ApiPropertyOptional({ description: "A senha do usuário", example: "senhaSegura123" })
  @IsNotEmpty({ message: "Campo 'senha' não pode ser vazio" })
  @MinLength(6, { message: "A 'senha' precisa ter pelo menos 6 caracteres" })
  @IsOptional()
  senha: string;

  @ApiPropertyOptional({ description: "O apelido do usuário", example: "Apelido" })
  @IsNotEmpty({ message: "Campo 'apelido' não pode ser vazio" })
  @IsOptional()
  apelido: string;

  @ApiPropertyOptional({ description: "O resumo do usuário", example: "Este é um resumo" })
  @IsOptional()
  resumo: string;

  @ApiPropertyOptional({ description: "A experiência profissional do usuário", example: "5 anos de experiência na área de TI" })
  @IsOptional()
  exp_profissional: string;

  @ApiPropertyOptional({ description: "A formação do usuário", example: "Graduação em Ciência da Computação" })
  @IsOptional()
  formacao: string;
}