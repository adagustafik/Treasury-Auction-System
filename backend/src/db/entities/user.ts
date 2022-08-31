import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Bid } from "./bid";
import { Purchase } from "./purchase";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
		id!: number;

	@Column({ unique: true })
		userName!: string;

	@Column()
		password!: string;

	@Column()
		email!: string;

	@Column("boolean", { default: false })
		isAdmin!: boolean;

	@OneToMany(() => Bid, (bid) => bid.user, {
		cascade: true,
	})
		bids!: Bid[];

	@OneToMany(() => Purchase, (purchase) => purchase.auction)
		purchases!: Purchase[];
}
