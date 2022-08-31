import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "./auction";
import { BidType } from "./types";
import { User } from "./user";

@Entity()
export class Bid {
	@PrimaryGeneratedColumn()
		bidId!: number;

	@Column({ type: "timestamp" })
		time!: Date;

	@Column()
		type!: BidType;

	@Column()
		amount!: number;

	@Column("float", { default: 0.0 })
		rate!: number;

	@ManyToOne(() => User, (user) => user.bids)
		user!: User;

	@ManyToOne(() => Auction, (auction) => auction.bids)
		auction!: Auction;
}
