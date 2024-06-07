import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Productos{
    @PrimaryColumn()
    id:number;
    @Column()       
    nombre: string;
    @Column()
    precio: number;
    @Column()
    stock: number;
    @Column()
    categoria: number;



}

