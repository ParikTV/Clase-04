import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Productos{
    @PrimaryColumn()
    id:number;
    @Column({length:50,nullable:false})       
    nombre: string;
    @Column()
    precio: number;
    @Column()
    stock: number;
    @Column({default:true})
    categoria: boolean;
    @Column({default:1})
    estado: boolean; 



}

