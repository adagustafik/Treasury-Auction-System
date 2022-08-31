import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Auction } from "./auction";
import { Bid } from "./bid";

@Entity()
export class Purchase {
	@PrimaryGeneratedColumn()
		purchaseId!: number;

	@Column()
		amount!: number;

	@Column("float", { default: 0.0 })
		rate!: number;

	@ManyToOne(() => Auction, (auction) => auction.bids)
		auction!: Auction;

	@OneToOne(() => Bid)
	@JoinColumn()
		bid!: Bid;
}
