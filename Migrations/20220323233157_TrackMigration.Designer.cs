﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using wavecloud.Data;

#nullable disable

namespace wavecloud.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220323233157_TrackMigration")]
    partial class TrackMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseSerialColumns(modelBuilder);

            modelBuilder.Entity("wavecloud.Data.Models.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseSerialColumn(b.Property<int>("Id"));

                    b.Property<string>("AssociatedFileName")
                        .HasColumnType("text")
                        .HasColumnName("associatedfilename");

                    b.Property<DateTime?>("UploadDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("uploaddate");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("userid");

                    b.Property<string>("trackName")
                        .HasColumnType("text")
                        .HasColumnName("trackname");

                    b.HasKey("Id")
                        .HasName("pk_tracks");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_tracks_userid");

                    b.ToTable("tracks", (string)null);
                });

            modelBuilder.Entity("wavecloud.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseSerialColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Password")
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .HasColumnType("text")
                        .HasColumnName("username");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("wavecloud.Data.Models.Track", b =>
                {
                    b.HasOne("wavecloud.Data.Models.User", "User")
                        .WithMany("Tracks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_tracks_users_userid");

                    b.Navigation("User");
                });

            modelBuilder.Entity("wavecloud.Data.Models.User", b =>
                {
                    b.Navigation("Tracks");
                });
#pragma warning restore 612, 618
        }
    }
}