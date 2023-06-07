"""Added all tables

Revision ID: ec46ad7fc181
Revises: 
Create Date: 2021-08-14 14:04:42.176345

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ec46ad7fc181"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(length=256), nullable=True),
        sa.Column("surname", sa.String(length=256), nullable=True),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("is_superuser", sa.Boolean(), nullable=True),
        sa.Column("hashed_password", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_email"), "user", ["email"], unique=False)
    op.create_index(op.f("ix_user_id"), "user", ["id"], unique=False)
    op.create_table(
        "recipe",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("label", sa.String(length=256), nullable=False),
        sa.Column("url", sa.String(length=256), nullable=True),
        sa.Column("notes", sa.String(length=256), nullable=True),
        sa.Column("source", sa.String(length=256), nullable=True),
        sa.Column("submitter_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["submitter_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_recipe_id"), "recipe", ["id"], unique=False)
    op.create_index(op.f("ix_recipe_url"), "recipe", ["url"], unique=False)
    op.create_index(op.f("ix_recipe_notes"), "recipe", ["notes"], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_recipe_url"), table_name="recipe")
    op.drop_index(op.f("ix_recipe_id"), table_name="recipe")
    op.drop_table("recipe")
    op.drop_index(op.f("ix_user_id"), table_name="user")
    op.drop_index(op.f("ix_user_email"), table_name="user")
    op.drop_table("user")
    # ### end Alembic commands ###