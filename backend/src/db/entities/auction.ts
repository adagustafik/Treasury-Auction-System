import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bid } from "./bid";
import { Purchase } from "./purchase";

@Entity()
export class Auction {
	@PrimaryGeneratedColumn()
		auctionId!: number;

	@Column()
		securityOffered!: number;

	@Column({ type: "timestamp" })
		auctionDate!: Date;

	@Column({ type: "timestamp" })
		issueDate!: Date;

	@Column({ type: "timestamp" })
		maturityDate!: Date;

	@Column()
		termsAndConditions!: string;

	@Column({ type: "timestamp" })
		nonCompetitiveBidCloseTime!: Date;

	@Column({ type: "timestamp" })
		competitiveBidCloseTime!: Date;

	@Column({ type: "float" })
		yield!: number;

	@Column({ type: "float" })
		rate!: number;

	@Column({ type: "float" })
		discount!: number;

	@Column("boolean", { default: false })
		resolved!: boolean;

	@OneToMany(() => Bid, (bid) => bid.auction, {
		cascade: true,
	})
		bids!: Bid[];

	@OneToMany(() => Purchase, (purchase) => purchase.auction)
		purchases!: Purchase[];
}
